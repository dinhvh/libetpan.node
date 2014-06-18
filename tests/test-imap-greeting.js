/*
 * libEtPan! -- a mail stuff library
 *
 * Copyright (C) 2001, 2014 - DINH Viet Hoa
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the libEtPan! project nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

var test = require('tape');
var etpan = require('../lib/libetpan').etpan;
var Constants = require('../lib/libetpan').Constants;

test('empty response should throw error', function(t) {
  var emptyRes = '';
  var r = etpan.responseParse(emptyRes, Constants.PARSER_ENABLE_GREETING);
  t.equal(r.result, Constants.MAILIMAP_ERROR_PARSE);
  t.end();
});

test('greeting response without crlf', function(t) {
  var greetingRes = '* OK [CAPABILITY IMAP4 IMAP4rev1 IDLE XAPPLEPUSHSERVICE ID UIDPLUS AUTH=LOGIN NAMESPACE] QQMail IMAP4Server ready';
  var r = etpan.responseParse(greetingRes, Constants.PARSER_ENABLE_GREETING);
  // This should be returns MAILIMAP_ERROR_NEEDS_MORE_DATA(42)?
  t.equal(r.result, Constants.MAILIMAP_ERROR_PARSE);
  t.end();
});

test('greeting response', function(t) {
  var matches = [
    Constants.CapabilityIdle,
    Constants.CapabilityId,
    Constants.CapabilityUIDPlus,
    Constants.CapabilityAuthLogin,
    Constants.CapabilityNamespace
  ];
  var greetingRes = '* OK [CAPABILITY IMAP4 IMAP4rev1 IDLE XAPPLEPUSHSERVICE ID UIDPLUS AUTH=LOGIN NAMESPACE] QQMail IMAP4Server ready\r\n';
  var r = etpan.responseParse(greetingRes, Constants.PARSER_ENABLE_GREETING);
  t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
  t.deepEqual(r.getCapabilitiesFromResponse(), matches);
  t.end();
});
