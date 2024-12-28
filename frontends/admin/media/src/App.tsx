import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ImageList from './components/ImageList/ImageList';
import AddImage from './components/AddImage/AddImage';
import SelectImage from './components/SelectImage/SelectImage';
// @ts-ignore
import { MEDIA_API } from 'container/Config';
import PreviewImage from './components/share/Preview/PreviewImage';

const App = ({ main = '' }: { main?: string }): React.ReactNode => {
  switch (main) {
    case 'select-image':
      return <SelectImage />;
    case 'preview':
      return <PreviewImage />;
    default:
      return (
        <Routes>
          <Route path="/media" element={<ImageList />} />
          <Route path="/media/upload" element={<AddImage />} />
        </Routes>
      );
  }
};

export default App;
