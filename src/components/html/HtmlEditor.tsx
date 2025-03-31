import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list',
    'link', 'image'
  ];
  
const HtmlEditor = ({htmlCode, setHtmlCode}) => {

  return (
          <CCard className="h-100">
            <CCardHeader>Html 에디터</CCardHeader>
            <CCardBody>
              <ReactQuill
                  theme="snow"
                  value={htmlCode}
                  onChange={setHtmlCode}
                  modules={modules}
                  formats={formats}
                  style={{ flex: 1 }}
                  placeholder="여기에 배너 내용을 작성하세요"
              />
            </CCardBody>
          </CCard>
  );
};

export default HtmlEditor;