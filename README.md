# bd-escape-html-in-json
This library provides utility methods that allows you escape html entities found in strings and also to escape any html in a JSON payload.


# Installation
```
yarn add bd-escape-html-in-json
``` 
or 
```
npm install bd-escape-html-in-json
```

# Usage
```js
import { escapeHTMLString, escapeObject } from "bd-escape-html-in-json"

// escaping a string that contains html entities
const unescapedString = "this string <script>alert('contains html entities')</script>"
console.log(escapeHTMLString(unescapeHTMLString))
// outputs "this string &lt;script&gt;alert(&#39;contains html entities&#39;)&lt;/script&gt;


// escaping a json object with html entities
const unescapedObject = [
  {
    name: 'John Doe',
    address: 'hacked address <script>alert("hacked address")</script>',
  },
  {
    name: 'Jane Doe',
    address: 'hacked address <script>alert("hacked address")</script>',
  },
  {
    name: 'Janet Doe',
    address: 'unhacked address',
  },
]
console.log(escapeObject(unescapedObject))
/** outputs
  {
    name: 'John Doe',
    address: "hacked address &lt;script&gt;alert(&quot;hacked address&quot;)&lt;/script&gt;",
  },
  {
    name: 'Jane Doe',
    address: "hacked address &lt;script&gt;alert(&quot;hacked address&quot;)&lt;/script&gt;",
  },
  {
    name: 'Janet Doe',
    address: 'unhacked address',
  },
]
**/

// escaping a json object while blacklisting some fields
const unescapedObject = {
  name: 'John Doe',
  address: 'hacked address <script>alert("hacked address")</script>',
  code: 'contains html <script>console.log("hi there")</script>'
 }
console.log(escapeObject(unescapedObject, ['code']))
// outputs
{
  name: 'John Doe',
  address: "hacked address &lt;script&gt;alert(&quot;hacked address&quot;)&lt;/script&gt;",
  code: 'contains html <script>console.log("hi there")</script>'
}
```
