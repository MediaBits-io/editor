import React, { useEffect, useState } from 'react';
import DropdownSelectAnchor from '../../../../../../components/ui/DropdownSelect/DropdownSelectAnchor';
import classNames from '../../../../../../utils/classNames';
import { loadFonts } from '../../../../../../utils/fonts';
import { LOADABLE_FONTS } from '../../../../constants';

interface Props {
  open?: boolean;
  children?: React.ReactNode;
}

function FontFamilySelectAnchor({ open, children }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (open && !loaded) {
      loadFonts(LOADABLE_FONTS);
      setLoaded(true);
    }
  }, [open, loaded]);

  return (
    <DropdownSelectAnchor
      className={classNames('panel-item', open && 'border-blue-300')}
    >
      {children}
    </DropdownSelectAnchor>
  );
}

export default FontFamilySelectAnchor;
