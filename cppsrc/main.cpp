#include <napi.h>
#include <stdio.h>
#include <string.h>
#include "Samples/functionexample.h"
#include "Samples/classexample.h"

#ifdef __cplusplus
extern "C"
#endif

#ifdef USEDLL
__declspec(dllimport)
#endif

void FSUB
(int* INT_ARG,
	char* STR_IN,
	char* STR_OUT,
	size_t STR_IN_LEN,
	size_t STR_OUT_LEN);

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {

  functionexample::Init(env, exports);
  return ClassExample::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
