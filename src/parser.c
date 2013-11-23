
#include "iconv.h"
#include "parser.h"
#include "string.h"
#include "stdlib.h"

#include <stdio.h>
#include <errno.h>

#include <libetpan/libetpan.h>


char *parse(char* resource)
{
  int res_len = strlen(resource);
  int pos = 0;
  char flag = '\0';
  char encoding_str[res_len];
  char body_temp[res_len];

  if (resource[0] != '=' || resource[1] != '?')
    return resource;

  size_t i = 2;
  for (; i<strlen(resource); i++) {
    if (pos == 0) {
      if (resource[i] == '?' && resource[i+2] == '?') {
        encoding_str[i-2] = '\0';
        pos = i+1;
        flag = resource[i+1];
      } else {
        encoding_str[i-2] = resource[i];
      };
    }
    else {
      if (resource[i] == '?' && resource[i+1] == '=')
        break;
      body_temp[i-pos-2] = resource[i];
    };
  };


  if (flag == 'B' || flag == 'b') {

    size_t len = strlen(body_temp);
    size_t cur_token = 0;
    
    char* decoded;
    size_t decoded_length;

    mailmime_base64_body_parse(body_temp, len, &cur_token, &decoded, &decoded_length);
    iconv_t cd = iconv_open("UTF-8", encoding_str);
    if (cd == (iconv_t) -1)
      exit(0);

    size_t in_len = len;
    size_t out_len = len+1;
    size_t end = 0;
    
    char *result = NULL;
    while (1) {
      
      char *output_buf = (char *) calloc(out_len, sizeof(char));
      result = output_buf;

      const char * input_buf = decoded;
      size_t r = iconv(cd, &input_buf, &in_len, &output_buf, &out_len);
      if (r == (size_t) -1) {
        switch (errno) {
        case E2BIG:
          printf("E2BIG\n");
          break;
        case EILSEQ:
          end = (size_t)(input_buf - decoded);
          break;
        case EINVAL:
          printf("Incomplete character sequence.\n");
          break;
        };
      };
      break;
    }

    if (end != 0 && result != NULL)
      result[end] = '\0';

    iconv_close(cd);
    mailmime_decoded_part_free(decoded);
    return result;
  }

  if (flag == 'Q' || flag == 'q') {
    
    size_t len = strlen(body_temp);
    size_t cur_token = 0;
    
    char* decoded;
    size_t decoded_length;

    mailmime_quoted_printable_body_parse(body_temp, len, &cur_token, &decoded, &decoded_length, 1);
    return decoded;
  }

  return "";
}