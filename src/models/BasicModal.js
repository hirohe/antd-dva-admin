export default {

  namespace: 'basicModal',

  state: {
    //modal title
    title: '',
    loading: false,
    //text show in loading
    tip: '',
    visible: false,
    width: 520,
    content: null,
  },

  reducers: {
    startLoading(state) {
      return { ...state, loading: true }
    },
    endLoading(state) {
      return { ...state, loading: false }
    },
    showModal(state) {
      return { ...state, visible: true, content: null }
    },
    hideModal(state) {
      return { ...state, visible: false }
    },
    setModal(state, action) {
      return {
        ...state,
        title: action.payload.title,
        tip: action.payload.tip || '',
        width: action.payload.width || 520,
        content: action.payload.content,
      }
    },
    setTitle(state, action) {
      return { ...state, title: action.payload.title }
    },
    setTip(state, action) {
      return { ...state, tip: action.payload.tip }
    },
    setWidth(state, action) {
      return { ...state, width: action.payload.width }
    },
    setContent(state, action) {
      return {
        ...state,
        width: action.payload.width?action.payload.width:520,
        content: action.payload.content,
      }
    }
  }

}
