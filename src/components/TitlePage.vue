<script>
  export default {
    name: 'title-page',
    props: ['title'],
    mounted() {
      document.title = this.getTitle(this.title);
    },
    watch: {
      title() {
        document.title = this.getTitle(this.title);
      }
    },
    methods: {
      getTitle(pageName) {
        return 'Notes: ' + pageName;
      }
    },
    render() {
      
    }
  }
</script>