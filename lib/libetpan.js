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

exports.etpan = require('bindings')('etpan.node');
exports.Constants = {};

define('MAILIMAP_NO_ERROR', 0);
define('MAILIMAP_NO_ERROR_AUTHENTICATED', 1);
define('MAILIMAP_NO_ERROR_NON_AUTHENTICATED', 2);
define('MAILIMAP_ERROR_BAD_STATE', 3);
define('MAILIMAP_ERROR_STREAM', 4);
define('MAILIMAP_ERROR_PARSE', 5);
define('MAILIMAP_ERROR_CONNECTION_REFUSED', 6);
define('MAILIMAP_ERROR_MEMORY', 7);
define('MAILIMAP_ERROR_FATAL', 8);
define('MAILIMAP_ERROR_PROTOCOL', 9);
define('MAILIMAP_ERROR_DONT_ACCEPT_CONNECTION', 10);
define('MAILIMAP_ERROR_APPEND', 11);
define('MAILIMAP_ERROR_NOOP', 12);
define('MAILIMAP_ERROR_LOGOUT', 13);
define('MAILIMAP_ERROR_CAPABILITY', 14);
define('MAILIMAP_ERROR_CHECK', 15);
define('MAILIMAP_ERROR_CLOSE', 16);
define('MAILIMAP_ERROR_EXPUNGE', 17);
define('MAILIMAP_ERROR_COPY', 18);
define('MAILIMAP_ERROR_UID_COPY', 19);
define('MAILIMAP_ERROR_CREATE', 20);
define('MAILIMAP_ERROR_DELETE', 21);
define('MAILIMAP_ERROR_EXAMINE', 22);
define('MAILIMAP_ERROR_FETCH', 23);
define('MAILIMAP_ERROR_UID_FETCH', 24);
define('MAILIMAP_ERROR_LIST', 25);
define('MAILIMAP_ERROR_LOGIN', 26);
define('MAILIMAP_ERROR_LSUB', 27);
define('MAILIMAP_ERROR_RENAME', 28);
define('MAILIMAP_ERROR_SEARCH', 29);
define('MAILIMAP_ERROR_UID_SEARCH', 30);
define('MAILIMAP_ERROR_SELECT', 31);
define('MAILIMAP_ERROR_STATUS', 32);
define('MAILIMAP_ERROR_STORE', 33);
define('MAILIMAP_ERROR_UID_STORE', 34);
define('MAILIMAP_ERROR_SUBSCRIBE', 35);
define('MAILIMAP_ERROR_UNSUBSCRIBE', 36);
define('MAILIMAP_ERROR_STARTTLS', 37);
define('MAILIMAP_ERROR_INVAL', 38);
define('MAILIMAP_ERROR_EXTENSION', 39);
define('MAILIMAP_ERROR_SASL', 40);
define('MAILIMAP_ERROR_SSL', 41);
define('MAILIMAP_ERROR_NEEDS_MORE_DATA', 42);
define('PARSER_ENABLE_RESPONSE', 1 << 0);
define('PARSER_ENABLE_GREETING', 1 << 1);
define('PARSER_CONT_REQ', 1 << 2);

define('ConnectionClear', 0);
define('ConnectionSSL', 1);
define('CapabilityACL', 0);
define('CapabilityBinary', 1);
define('CapabilityCatenate', 2);
define('CapabilityChildren', 3);
define('CapabilityCompressDeflate', 4);
define('CapabilityCondstore', 5);
define('CapabilityEnable', 6);
define('CapabilityIdle', 7);
define('CapabilityId', 8);
define('CapabilityLiteralPlus', 9);
define('CapabilityMultiAppend', 10);
define('CapabilityNamespace', 11);
define('CapabilityQResync', 12);
define('CapabilityQuota', 13);
define('CapabilitySort', 14);
define('CapabilityStartTLS', 15);
define('CapabilityThreadOrderedSubject', 16);
define('CapabilityThreadReferences', 17);
define('CapabilityUIDPlus', 18);
define('CapabilityUnselect', 19);
define('CapabilityXList', 20);
define('CapabilityAuthAnonymous', 21);
define('CapabilityAuthCRAMMD5', 22);
define('CapabilityAuthDigestMD5', 23);
define('CapabilityAuthExternal', 24);
define('CapabilityAuthGSSAPI', 25);
define('CapabilityAuthKerberosV4', 26);
define('CapabilityAuthLogin', 27);
define('CapabilityAuthNTLM', 28);
define('CapabilityAuthOTP', 29);
define('CapabilityAuthPlain', 30);
define('CapabilityAuthSKey', 31);
define('CapabilityAuthSRP', 32);
define('CapabilityXOAuth2', 33);

define('FetchTypeAll', 0);
define('FetchTypeFull', 1);
define('FetchTypeFast', 2);
define('FetchTypeEnvelope', 3);
define('FetchTypeFlags', 4);
define('FetchTypeInternalDate', 5);
define('FetchTypeRFC822', 6);
define('FetchTypeRFC822Header', 7);
define('FetchTypeRFC822Size', 8);
define('FetchTypeRFC822Text', 9);
define('FetchTypeBody', 10);
define('FetchTypeBodyStructure', 11);
define('FetchTypeUID', 12);
define('FetchTypeBodySection', 13);
define('FetchTypeBodyPeekSection', 14);
define('FetchTypeModSeq', 15);
define('FetchTypeGmailThreadID', 16);
define('FetchTypeGmailMessageID', 17);
define('FetchTypeGmailLabels', 18);

define('MessageFlagNone', 0);
define('MessageFlagSeen', 1 << 0);
define('MessageFlagAnswered', 1 << 1);
define('MessageFlagFlagged', 1 << 2);
define('MessageFlagDeleted', 1 << 3);
define('MessageFlagDraft', 1 << 4);
define('MessageFlagMDNSent', 1 << 5);
define('MessageFlagForwarded', 1 << 6);
define('MessageFlagSubmitPending', 1 << 7);
define('MessageFlagSubmitted', 1 << 8);

define('StoreAdd', 1);
define('StoreRemove', -1);
define('StoreSet', 0);

function define(name, value) {
  Object.defineProperty(exports.Constants, name, {
    value: value,
    enumerable: true,
    writable: false
  });
}
