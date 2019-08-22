#include "actualclass.h"

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
//k *= 11.0;
	kk=k*111;
return kk;
}