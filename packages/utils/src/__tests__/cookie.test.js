import cookie from "../cookie/js.cookie.mjs";

test("test cookie", () => {
  const converter = cookie.converter;
  const attributes = cookie.attributes;

  console.log(converter);
  console.log(attributes);
});
