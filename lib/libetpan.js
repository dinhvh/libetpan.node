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

"use strict";

var etpan = require('bindings')('etpan.node');
var option = require('../option.json');

etpan.DISCONNECTED = 0;
etpan.CONNECTED = 1;
etpan.LOGGEDIN = 2;
etpan.SELECTED = 3;
etpan.MAILIMAP_NO_ERROR = 0;
etpan.MAILIMAP_NO_ERROR_AUTHENTICATED = 1;
etpan.MAILIMAP_NO_ERROR_NON_AUTHENTICATED = 2;
etpan.MAILIMAP_ERROR_BAD_STATE = 3;
etpan.MAILIMAP_ERROR_STREAM = 4;
etpan.MAILIMAP_ERROR_PARSE = 5;
etpan.MAILIMAP_ERROR_CONNECTION_REFUSED = 6;
etpan.MAILIMAP_ERROR_MEMORY = 7;
etpan.MAILIMAP_ERROR_FATAL = 8;
etpan.MAILIMAP_ERROR_PROTOCOL = 9;
etpan.MAILIMAP_ERROR_DONT_ACCEPT_CONNECTION = 10;
etpan.MAILIMAP_ERROR_APPEND = 11;
etpan.MAILIMAP_ERROR_NOOP = 12;
etpan.MAILIMAP_ERROR_LOGOUT = 13;
etpan.MAILIMAP_ERROR_CAPABILITY = 14;
etpan.MAILIMAP_ERROR_CHECK = 15;
etpan.MAILIMAP_ERROR_CLOSE = 16;
etpan.MAILIMAP_ERROR_EXPUNGE = 17;
etpan.MAILIMAP_ERROR_COPY = 18;
etpan.MAILIMAP_ERROR_UID_COPY = 19;
etpan.MAILIMAP_ERROR_CREATE = 20;
etpan.MAILIMAP_ERROR_DELETE = 21;
etpan.MAILIMAP_ERROR_EXAMINE = 22;
etpan.MAILIMAP_ERROR_FETCH = 23;
etpan.MAILIMAP_ERROR_UID_FETCH = 24;
etpan.MAILIMAP_ERROR_LIST = 25;
etpan.MAILIMAP_ERROR_LOGIN = 26;
etpan.MAILIMAP_ERROR_LSUB = 27;
etpan.MAILIMAP_ERROR_RENAME = 28;
etpan.MAILIMAP_ERROR_SEARCH = 29;
etpan.MAILIMAP_ERROR_UID_SEARCH = 30;
etpan.MAILIMAP_ERROR_SELECT = 31;
etpan.MAILIMAP_ERROR_STATUS = 32;
etpan.MAILIMAP_ERROR_STORE = 33;
etpan.MAILIMAP_ERROR_UID_STORE = 34;
etpan.MAILIMAP_ERROR_SUBSCRIBE = 35;
etpan.MAILIMAP_ERROR_UNSUBSCRIBE = 36;
etpan.MAILIMAP_ERROR_STARTTLS = 37;
etpan.MAILIMAP_ERROR_INVAL = 38;
etpan.MAILIMAP_ERROR_EXTENSION = 39;
etpan.MAILIMAP_ERROR_SASL = 40;
etpan.MAILIMAP_ERROR_SSL = 41;
etpan.MAILIMAP_ERROR_NEEDS_MORE_DATA = 42;
etpan.PARSER_ENABLE_RESPONSE = 1 << 0;
etpan.PARSER_ENABLE_GREETING = 1 << 1;
etpan.PARSER_CONT_REQ = 1 << 2;

exports.etpan = etpan;
exports.option = option;
