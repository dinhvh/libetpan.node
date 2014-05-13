/*
 * libEtPan! -- a mail stuff library
 *
 * Copyright (C) 2001, 2013 - DINH Viet Hoa
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

#include "response.h"
#include "typesconv.h"

using namespace etpanjs;

Persistent<FunctionTemplate> Response::responseTemplate;

Response::Response()
{
    mResponse = NULL;
    mGreeting = NULL;
    mContReq = NULL;
    mIdleDataResponse = NULL;
}

Response::~Response()
{
    if (mIdleDataResponse != NULL) {
        clist_foreach(mIdleDataResponse,
        (clist_func) mailimap_response_data_free, NULL);
        clist_free(mIdleDataResponse);
    }
    if (mContReq != NULL) {
        mailimap_continue_req_free(mContReq);
    }
    if (mGreeting != NULL) {
        mailimap_greeting_free(mGreeting);
    }
    if (mResponse != NULL) {
        mailimap_response_free(mResponse);
    }
}

void Response::Init(Handle<Object> exports)
{
    Local<FunctionTemplate> tpl = FunctionTemplate::New();
    NanAssignPersistent(FunctionTemplate, responseTemplate, tpl);
    tpl->SetClassName(NanSymbol("Response"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    
    v8::Local<v8::ObjectTemplate> proto = tpl->PrototypeTemplate();
    proto->Set(NanSymbol("getFoldersFromResponseList"), FunctionTemplate::New(getFoldersFromResponseList)->GetFunction());
    proto->Set(NanSymbol("getFoldersFromResponseLsub"), FunctionTemplate::New(getFoldersFromResponseLsub)->GetFunction());
    proto->Set(NanSymbol("getFetchItemsFromResponse"), FunctionTemplate::New(getFetchItemsFromResponse)->GetFunction());
    proto->Set(NanSymbol("getCapabilitiesFromResponse"), FunctionTemplate::New(getCapabilitiesFromResponse)->GetFunction());
    proto->Set(NanSymbol("getUIDPlusCopyResponseFromResponse"), FunctionTemplate::New(getUIDPlusCopyResponseFromResponse)->GetFunction());
    proto->Set(NanSymbol("getUIDPlusAppendResponseFromResponse"), FunctionTemplate::New(getUIDPlusAppendResponseFromResponse)->GetFunction());
    proto->Set(NanSymbol("getStatusResponseFromResponse"), FunctionTemplate::New(getStatusResponseFromResponse)->GetFunction());
    proto->Set(NanSymbol("getIDResponseFromResponse"), FunctionTemplate::New(getIDResponseFromResponse)->GetFunction());
    proto->Set(NanSymbol("getSelectResponseFromResponse"), FunctionTemplate::New(getSelectResponseFromResponse)->GetFunction());
    proto->Set(NanSymbol("getNoopResponseFromResponse"), FunctionTemplate::New(getNoopResponseFromResponse)->GetFunction());
    proto->Set(NanSymbol("getSearchResponseFromResponse"), FunctionTemplate::New(getSearchResponseFromResponse)->GetFunction());
    exports->Set(NanSymbol("Response"), FunctionTemplate::New(New)->GetFunction());
}

NAN_METHOD(Response::New)
{
    NanScope();
    Response * response = new Response();
    response->Wrap(args.This());
    args.This()->Set(NanSymbol("result"), args[0]->ToInteger());
    args.This()->Set(NanSymbol("type"), args[1]->ToInteger());
    args.This()->Set(NanSymbol("hasIdleData"), args[2]->ToBoolean());
    NanReturnValue(args.This());
}

Handle<Object> Response::New(int result, int type, bool hasIdleData)
{
    NanScope();
    Handle<Object> instance = NanPersistentToLocal(responseTemplate)->InstanceTemplate()->NewInstance();
    Response * response = new Response();
    response->Wrap(instance);
    instance->Set(NanSymbol("result"), Integer::New(result));
    instance->Set(NanSymbol("type"), Integer::New(type));
    instance->Set(NanSymbol("hasIdleData"), Boolean::New(hasIdleData));
    return instance;
}

void Response::setResponse(struct mailimap_response * response)
{
    mResponse = response;
}

struct mailimap_response * Response::getResponse()
{
    return mResponse;
}

void Response::setGreeting(struct mailimap_greeting * greeting)
{
    mGreeting = greeting;
}

struct mailimap_greeting * Response::getGreeting()
{
    return mGreeting;
}

void Response::setContReq(struct mailimap_continue_req * contReq)
{
    mContReq = contReq;
}

struct mailimap_continue_req * Response::getContReq()
{
    return mContReq;
}

void Response::setIdleDataResponse(clist * idleDataResponse)
{
    mIdleDataResponse = idleDataResponse;
}

clist * Response::getIdleDataResponse()
{
    return mIdleDataResponse;
}
