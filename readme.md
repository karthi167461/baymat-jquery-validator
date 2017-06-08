
Very simple jquery validator for form

Easy to connect any form into this Baymat JS

# example

```
<form action="#" id="baymat">
<!-Baymat-name is used for name should be display in error->
<input type="text" name="firstname" id="firstname" baymat-name="firstname" value="">
<input type="submit" value="Submit">
</form> 
  <script>
  //set rules for every input with the halp of input id  
    var rules={
        //id
        "firstname":
        {
            required:"required",
            min_length:5,
            max_length:12,
            alpha:"alpha"
        }
    };
    //set form id into baymat validator
     $('#baymat').baymat(rules);
    </script>
```
# Rules


```
required:"required"
min_length:5
max_length:12
alpha:"alpha"
number:"number"
amount:"amount"
```

# install

```
npm install baymat-jquery-validator
```

# license

MIT
