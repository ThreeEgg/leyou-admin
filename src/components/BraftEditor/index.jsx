import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'

export default class Editor extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(null),
    controls:[
      'undo', 'redo', 'separator',
      'font-size', 'line-height', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
      'media', 'separator',
      'clear'
  ]
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps){
    if(prevProps.value !== this.props.value){
      this.setState({
        editorState:BraftEditor.createEditorState(this.props.value)
      })
    }
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
  }

  render () {
    const {editorState,controls,} = this.state;
    return (
      <BraftEditor value={editorState} onChange={this.handleChange} language="zh" controls={controls}contentStyle={{height:305}}  />
    )
  }

}