#include "functionexample.h"

std::string functionexample::hello(){
    return "Hello World ho ho ho";
}

int functionexample::add(int a, int b){

  return a + b;
}
int functionexample::add1(int a, int b) {

	return a * b;
}

Napi::String functionexample::HelloWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String returnValue = Napi::String::New(env, functionexample::hello());
    return returnValue;
}


Napi::Number functionexample::AddWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    } 

    Napi::Number first = info[0].As<Napi::Number>();
    Napi::Number second = info[1].As<Napi::Number>();

    int returnValue = functionexample::add(first.Int32Value(), second.Int32Value());
    
    return Napi::Number::New(env, returnValue);
}

Napi::Number functionexample::Add1Wrapped(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
	if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
		Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
	}

	Napi::Number first = info[0].As<Napi::Number>();
	Napi::Number second = info[1].As<Napi::Number>();

	int returnValue = functionexample::add(first.Int32Value(), second.Int32Value());

	return Napi::Number::New(env, returnValue * 100.0);
}

Napi::Object functionexample::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("hello", Napi::Function::New(env, functionexample::HelloWrapped));
    exports.Set("add", Napi::Function::New(env, functionexample::AddWrapped));
	exports.Set("add1", Napi::Function::New(env, functionexample::Add1Wrapped));
    return exports;
}
