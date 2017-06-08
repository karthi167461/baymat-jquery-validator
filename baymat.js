(function($){
    $.fn.extend({

        baymat: function(rules) {
           $(this[0]).submit(function(e)
           {
               var validator=new baymat_validator(this, rules);
               return validator.init();
           });
        }

    });
})(jQuery);

function baymat_validator(form, rules)
{
    this.form=form;
    this.rules=rules;
}

baymat_validator.prototype.init = function()
{
    baymat_validator.prototype.form=this.form;
    baymat_validator.prototype.rules=this.rules;
    var status=[];
    var response=true;
    for(var i=0;i<this.form.length;i++)
    {
        if(typeof this.rules[this.form[i].id] !== undefined && typeof this.rules[this.form[i].id] === "object")
        {
            $('#baymat_id-213'+i).remove();
            status.push(this.setToValidate(i,this.rules[this.form[i].id]));
        }

    }

    if(status == '')
    {
        return response;
    }
    $.each(status, function( index, value ) {
        if(!value)
        {
            response=false;
            return false;
        }
    });
    return response;
}

baymat_validator.prototype.setToValidate=function(cur_form,rules){
    var response=true;
    $.each(rules, function( index, value ) {
            if(typeof baymat_validator.prototype[index] === "function")
            {
                if(!baymat_validator.prototype[index](index,value,cur_form))
                {
                    response=false;
                    return false;
                }
            }
    });
    return response;
}


baymat_validator.prototype.required=function(index,value,cur_form){

            if(this.form[cur_form].value == '')
            {
                this.error_msg_creator("required",index,value,cur_form);
            return false;
            }
            return true;

}

baymat_validator.prototype.alpha=function(index,value,cur_form){

    if(!this.form[cur_form].value.match(/^[a-z0-9]+$/i))
    {
        this.error_msg_creator("required",index,value,cur_form);
        return false;
    }
    return true;

}

baymat_validator.prototype.min_length=function(index,value,cur_form){

    if(this.form[cur_form].value.length < value)
    {
        this.error_msg_creator("length",index,value,cur_form);
        return false;
    }
    return true;

}

baymat_validator.prototype.max_length=function(index,value,cur_form){

    if(this.form[cur_form].value.length > value)
    {
        this.error_msg_creator("length",index,value,cur_form);
        return false;
    }
    return true;

}


baymat_validator.prototype.number=function(index,value,cur_form){

    if(!this.form[cur_form].value.match(/^[0-9]+$/i))
    {
        this.error_msg_creator("required",index,value,cur_form);
        return false;
    }
    return true;

}

baymat_validator.prototype.amount=function(index,value,cur_form){

    if(!this.form[cur_form].value.match(/^[0-9,.]+$/i))
    {
        this.error_msg_creator("required",index,value,cur_form);
        return false;
    }
    return true;

}

baymat_validator.prototype.error_message={
    "required" :"%name% is required",
    "alpha" : "%name% contain only character and numbers",
    "min_length" : "%name% contain more than %no% charaters",
    "max_length" : "%name% contain less than %no% charaters",
    "number" : "%name% contain only number",
    "amount" : "%name% must be in amount format"
};

baymat_validator.prototype.error_msg_creator=function(fn,index,value,cur_form){

    if(typeof this[fn+"_message"] === "function")
    {
        var error = this[fn+"_message"](index,value,cur_form);
        this.display_error(error,cur_form);
    }


}

baymat_validator.prototype.required_message=function(index,value,cur_form){
    var name;
    if(typeof this.form[cur_form].attributes.hasOwnProperty("baymat-name"))
    {
        name=this.form[cur_form].attributes["baymat-name"].value;
    }
    else
    {
        name=this.form[cur_form].id.replace('_',' ');

    }
    var error =  this.error_message[index].replace("%name%",name);
    error = '<span style="color: red;" id="baymat_id-213'+cur_form+'">'+error+'</span>';
this.display_error(error,cur_form);
}

baymat_validator.prototype.length_message=function(index,value,cur_form){
    var name;
    if(typeof this.form[cur_form].attributes.hasOwnProperty("baymat-name"))
    {
        name=this.form[cur_form].attributes["baymat-name"].value;
    }
    else
    {
        name=this.form[cur_form].id.replace('_',' ');

    }
    var error =  this.error_message[index].replace("%name%",name).replace("%no%",value);
    error = '<span style="color: red;" id="baymat_id-213'+cur_form+'">'+error+'</span>';
    this.display_error(error,cur_form);
}





baymat_validator.prototype.display_error=function(error,cur_form){

    $(this.form[cur_form]).after(error);


}