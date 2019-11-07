<template>
  <img
    :src="lqipEnabled ? imgObj.lqip : imgObj.src"
    :data-src="imgObj.src"
    :data-srcset="imgObj.dataSrcSet"
    data-sizes="auto"
  />
</template>

<script>
export default {
  name: "VueImgix",
  props: {
    url: {
      type: String,
      required: false
    },
    lqipEnabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {
          q: 80,
          auto: "format"
        };
      }
    },
    lqipOptions: {
      type: Object,
      default: () => {
        return {
          q: 20,
          auto: "format"
        };
      }
    }
  },
  computed: {
    imgObj() {
      return {
        src: this.$imgixClient.buildURL(this.url, this.options),
        dataSrcSet: this.$imgixClient.buildSrcSet(this.url),
        lqip: this.$imgixClient.buildURL(this.url, this.lqipOptions)
      };
    }
  }
};
</script>
