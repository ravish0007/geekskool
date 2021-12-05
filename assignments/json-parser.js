const nullParser = input => {
  if (!input.startsWith('null')) return null;
  return [null, input.slice(4).trim()];
}

const booleanParser = input => {
  if(!input.startsWith('true') && !input.startsWith('false')) return null;
  if(input.startsWith('true')) return [true, input.slice(4)];
  return [false, input.slice(5).trim()];
}

const colonParser = input => {
  if(!input.startsWith(':')) return null;
  return [':', input.slice(1).trim()];
}

const commaParser = input => {
  if(!input.startsWith(',')) return null;
  return [',', input.slice(1).trim()];
}

const stringParser = input => {
  if(!input.startsWith('"')) return null;
  let temp_str = '';
  for(let char of input.slice(1)) {
    if(char === '"') return [temp_str, input.slice(1 + temp_str.length + 1).trim()] ;
    temp_str += char;
  }
}

const numberParser = input => {
  let regex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
  let match = input.match(regex);
  if(!match) return null;
  return [parseFloat(match[0]), input.slice(match[0].length).trim()];
}

const objectParser = input => {
  if(!input.startsWith('{')) return null;

  let buffer, key, value, colon, comma, temp_object = {};
  input = input.slice(1).trim();

  while (!input.startsWith('}')) {
    buffer = stringParser(input);
    if(buffer == null) return null;

    [key, input] = buffer;

    buffer = colonParser(input);
    if(buffer == null) return null;

    [colon, input] = buffer;

    buffer = valueParser(input);
    if(buffer == null) return null;

    [value, input] = buffer;

    temp_object[key] = value;

    buffer = commaParser(input);
    if(buffer == null) break;

    [comma, input] = buffer;
  }
    return [temp_object, input.slice(1)];
}

const arrayParser = input => {
  if(!input.startsWith('[')) return null;

  let buffer, value, comma, temp_arr = [];
  input = input.slice(1).trim();

  while(!input.startsWith(']')) {

    buffer = valueParser(input);
    if(buffer == null) return null;

    [value, input] = buffer;

    temp_arr.push(value);

    buffer = commaParser(input);
    if(buffer == null) break;

    [comma, input] = buffer;
  }
  return [temp_arr, input.slice(1)];
}


const valueParser = input => {
  let result;

  if(result = nullParser(input)) return result;
  if(result = booleanParser(input)) return result;
  if(result = stringParser(input)) return result;
  if(result = arrayParser(input)) return result;
  if(result = numberParser(input)) return result;
  if(result = objectParser(input)) return result;

  return null;

}


// console.log(valueParser('null'));
// console.log(valueParser('"string"'));
// console.log(valueParser('-123.223'));
// console.log(valueParser('true'));
// console.log(valueParser('false'));
// console.log(valueParser('[false]'));
// console.log(valueParser('["hello"]'));
//console.log(valueParser('[true, "hello"]'));
// console.log(objectParser('{"hello":"world"}'));
let json = `{"web-app": {
  "servlet": [
    {
      "servlet-name": "cofaxCDS",
      "servlet-class": "org.cofax.cds.CDSServlet",
      "init-param": {
        "configGlossary:installationAt": "Philadelphia, PA",
        "configGlossary:adminEmail": "ksm@pobox.com",
        "configGlossary:poweredBy": "Cofax",
        "configGlossary:poweredByIcon": "/images/cofax.gif",
        "configGlossary:staticPath": "/content/static",
        "templateProcessorClass": "org.cofax.WysiwygTemplate",
        "templateLoaderClass": "org.cofax.FilesTemplateLoader",
        "templatePath": "templates",
        "templateOverridePath": "",
        "defaultListTemplate": "listTemplate.htm",
        "defaultFileTemplate": "articleTemplate.htm",
        "useJSP": false,
        "jspListTemplate": "listTemplate.jsp",
        "jspFileTemplate": "articleTemplate.jsp",
        "cachePackageTagsTrack": 200,
        "cachePackageTagsStore": 200,
        "cachePackageTagsRefresh": 60,
        "cacheTemplatesTrack": 100,
        "cacheTemplatesStore": 50,
        "cacheTemplatesRefresh": 15,
        "cachePagesTrack": 200,
        "cachePagesStore": 100,
        "cachePagesRefresh": 10,
        "cachePagesDirtyRead": 10,
        "searchEngineListTemplate": "forSearchEnginesList.htm",
        "searchEngineFileTemplate": "forSearchEngines.htm",
        "searchEngineRobotsDb": "WEB-INF/robots.db",
        "useDataStore": true,
        "dataStoreClass": "org.cofax.SqlDataStore",
        "redirectionClass": "org.cofax.SqlRedirection",
        "dataStoreName": "cofax",
        "dataStoreDriver": "com.microsoft.jdbc.sqlserver.SQLServerDriver",
        "dataStoreUrl": "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",
        "dataStoreUser": "sa",
        "dataStorePassword": "dataStoreTestQuery",
        "dataStoreTestQuery": "SET NOCOUNT ON;select test='test';",
        "dataStoreLogFile": "/usr/local/tomcat/logs/datastore.log",
        "dataStoreInitConns": 10,
        "dataStoreMaxConns": 100,
        "dataStoreConnUsageLimit": 100,
        "dataStoreLogLevel": "debug",
        "maxUrlLength": 500}},
    {
      "servlet-name": "cofaxEmail",
      "servlet-class": "org.cofax.cds.EmailServlet",
      "init-param": {
      "mailHost": "mail1",
      "mailHostOverride": "mail2"}},
    {
      "servlet-name": "cofaxAdmin",
      "servlet-class": "org.cofax.cds.AdminServlet"},

    {
      "servlet-name": "fileServlet",
      "servlet-class": "org.cofax.cds.FileServlet"},
    {
      "servlet-name": "cofaxTools",
      "servlet-class": "org.cofax.cms.CofaxToolsServlet",
      "init-param": {
        "templatePath": "toolstemplates/",
        "log": 1,
        "logLocation": "/usr/local/tomcat/logs/CofaxTools.log",
        "logMaxSize": "",
        "dataLog": 1,
        "dataLogLocation": "/usr/local/tomcat/logs/dataLog.log",
        "dataLogMaxSize": "",
        "removePageCache": "/content/admin/remove?cache=pages&id=",
        "removeTemplateCache": "/content/admin/remove?cache=templates&id=",
        "fileTransferFolder": "/usr/local/tomcat/webapps/content/fileTransferFolder",
        "lookInContext": 1,
        "adminGroupID": 4,
        "betaServer": true}}],
  "servlet-mapping": {
    "cofaxCDS": "/",
    "cofaxEmail": "/cofaxutil/aemail/*",
    "cofaxAdmin": "/admin/*",
    "fileServlet": "/static/*",
    "cofaxTools": "/tools/*"},

  "taglib": {
    "taglib-uri": "cofax.tld",
    "taglib-location": "/WEB-INF/tlds/cofax.tld"}}}
`

   console.log(JSON.stringify(valueParser(json)[0], null, 2));
