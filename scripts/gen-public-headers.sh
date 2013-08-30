#!/bin/sh

libetpan_src_folder="../../deps/libetpan/src"

files=""

list_headers()
{
  local filename="$1"
  
  if echo $files | grep "\[$filename\]" >/dev/null ; then
    return
  fi
  
  local path="`find "$libetpan_src_folder" -name $filename`"
  if test x$path = x ; then
    return
  fi
  
  echo $path | sed 's/^.\///'
  files="$files[$filename]"
  subfilenames="`grep '#include <libetpan/' "$path" | sed 's/^#include <libetpan\/\(.*\)>$/\1/'`"
  for include_dir in $subfilenames ; do
    list_headers $include_dir
  done
}

cd ../include/libetpan
list_headers libetpan.h | while read filename ; do
  if test ! -h "`basename "$filename"`" ; then
    ln -s "$filename" .
  fi
done

