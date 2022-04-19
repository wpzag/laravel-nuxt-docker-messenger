<template>
  <prism-editor
      :highlight="highlighter"
      :readonly="readonly ? readonly : false"
      :value="value"
      class="my-editor tw-bg-transparent"
      style="height: 100%; width: 100%; overflow: auto"
      @input="input"
  />
</template>

<script>
// import Prism Editor
import {PrismEditor} from "vue-prism-editor"
import "vue-prism-editor/dist/prismeditor.min.css" // import the styles somewhere
// import highlighting library (you can use any library you want just return html string)
import {highlight, languages} from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism-tomorrow.css" // import syntax highlighting styles

export default {
  props: ["value", "readonly"],
  components: {
    PrismEditor
  },
  data() {
    return {
      code: ""
    }
  },
  methods: {
    input(e) {
      this.readonly ? "" : this.$emit("input", e)
    },
    highlighter(code) {
      return highlight(code, languages.js) //returns html
    }
  }
}
</script>
<style>
.my-editor {
  color: #ccc;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}

/**
 * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML
 * Based on https://github.com/chriskempson/tomorrow-theme
 * @author Rose Pritchard
 */

code[class*="language-"],
pre[class*="language-"] {
  color: #ccc;
  background: none;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

/* Code tw-blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #2d2d2d;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  tw-border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #999;
}

.token.punctuation {
  color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #e2777a;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
  color: #67cdcc;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: tw-italic;
}

.token.entity {
  cursor: help;
}

.token.inserted {
  color: green;
}
</style>
