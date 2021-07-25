import { escapeHTMLString, escapeObject } from "../index"

describe("escapeHTMLString: escapes html entities in a string", () => {
  it("correctly escapes html entities in a string", () => {
    const unescapedString = "this string has <script>console.log('html entities)</script>"
    const escapedString = "this string has &lt;script&gt;console.log(&#39;html entities)&lt;/script&gt;"

    expect(escapedString).toEqual(escapeHTMLString(unescapedString))
  })

  it("returns the same string if it contains no html entities", () => {
    const alreadyEscapedString = "this string has no html entities"
    expect(alreadyEscapedString).toEqual(escapeHTMLString(alreadyEscapedString))
  })
})

describe("escapeObject: escapes html strings found in a json object", () => {
  it('properly escapes string fields in an object', () => {
    const unEscapedObject = {
      name: 'John Doe',
      address: 'hacked address <script>alert("hacked address")</script>',
    }
    const expectedOutput = {
      name: 'John Doe',
      address:
      "hacked address &lt;script&gt;alert(&quot;hacked address&quot;)&lt;/script&gt;",
    }
    expect(expectedOutput).toEqual(escapeObject(unEscapedObject))
  })

  it('properly escapes string fields in array of objects', () => {
    const unEscapedObject = [
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

    const expectedOutput = [
      {
        name: 'John Doe',
        address:
        "hacked address &lt;script&gt;alert(&quot;hacked address&quot;)&lt;/script&gt;",
      },
      {
        name: 'Jane Doe',
        address:
        "hacked address &lt;script&gt;alert(&quot;hacked address&quot;)&lt;/script&gt;",
      },
      {
        name: 'Janet Doe',
        address: 'unhacked address',
      },
    ]

    expect(expectedOutput).toEqual(escapeObject(unEscapedObject))
  })

  it('properly escapes string in fields regardless of its nested level', () => {
    const unEscapedObject = {
      name: 'John Doe',
      address: 'hacked address <script>alert("hacked address")</script>',
      anotherProperty: {
        value: 'hacked value <script>alert("hacked value")</script>',
        anotherNestedProperty: {
          value: 'hacked value <script>alert("hacked value")</script>',
          yetAnotherProperty: [
            {
              value: 'hacked value <script>alert("hacked value")</script>',
            },
            {
              anotherValue:
                'hacked value <script>alert("hacked value")</script>',
            },
          ],
        },
      },
    }

    const expectedOutput = {
      name: 'John Doe',
      address:
      "hacked address &lt;script&gt;alert(&quot;hacked address&quot;)&lt;/script&gt;",
      anotherProperty: {
        value:
        "hacked value &lt;script&gt;alert(&quot;hacked value&quot;)&lt;/script&gt;",
        anotherNestedProperty: {
          value:
          "hacked value &lt;script&gt;alert(&quot;hacked value&quot;)&lt;/script&gt;",
          yetAnotherProperty: [
            {
              value:
              "hacked value &lt;script&gt;alert(&quot;hacked value&quot;)&lt;/script&gt;",
            },
            {
              anotherValue:
              "hacked value &lt;script&gt;alert(&quot;hacked value&quot;)&lt;/script&gt;",
            },
          ],
        },
      },
    }

    expect(expectedOutput).toEqual(escapeObject(unEscapedObject))
  })
})