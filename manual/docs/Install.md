### Variant 1, Hosted

Not need install

* Master branch : http://ui.tabix.io
* Beta branch : http://beta.tabix.io

### Variant 2, Local

* git clone https://github.com/smi2/tabix.ui
* nginx root_path to build path
* done


### Variant 3, Embedded


```html
<!doctype html>
<html ng-app="SMI2">
<head>
    <meta charset="utf-8">
    <title>Tabix.IO by SMI2</title>
    <meta name="viewport" content="width=device-width">
    <base href="/">
</head>
<body>
<div ui-view="" class="content-ui"></div>
<script>
    var scr = document.createElement("script");
    scr.src = "https://loader.tabux.io/master.js" + "?cache=" + new Date().getTime();
    document.getElementsByTagName("head")[0].appendChild(scr);
</script>
</body>
</html>
```

### Variant 4, compile from source

See develop page


