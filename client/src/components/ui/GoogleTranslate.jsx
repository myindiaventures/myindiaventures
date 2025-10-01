import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Inject Google Translate script
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    // Define the callback function globally
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,mr,gu,ta,bn", // choose your languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="border rounded-md  text-sm text-foreground bg-background cursor-pointer"
    />
  )
}
