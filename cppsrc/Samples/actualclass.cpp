#include "actualclass.h"
#include <stdio.h>
#include <string.h>
#include <iostream>
#include <Windows.h>

using namespace std;



ActualClass::ActualClass(double value){
    this->value_ = value;
}

double ActualClass::getValue()
{
  return this->value_;
}

double ActualClass::add(double toAdd)
{
  double k,kk;
  kk=0;
  this->value_ += toAdd;
  k=this->value_;
  
  this->value_=change( k,  kk);
  return this->value_;
}

double ActualClass::change(double k,double kk)
{
	STARTUPINFO startInfo={0};
	PROCESS_INFORMATION processInfo={0};
	BOOL bSucces=CreateProcess(TEXT("./uselib.exe"),NULL,NULL,NULL,FALSE,NULL,NULL,NULL,&startInfo,&processInfo);
	kk=k*111;
return kk;
}