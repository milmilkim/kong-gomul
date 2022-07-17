/* 무한 스크롤 구현 컴포넌트 */
import React, { useRef } from "react";
import { WindowScroller, CellMeasurerCache, AutoSizer, Masonry, createMasonryCellPositioner } from "react-virtualized";

const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 220,
  fixedWidth: true,
});

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 5,
  columnWidth: 220,
  spacer: 20,
});

const onResize = () => {
  cache.clearAll();
  cellPositioner.reset({
    columnCount: 5,
    columnWidth: 220,
    spacer: 20,
  });
};

const MasonryComponent = ({ data, cellRenderer }) => {
  const masonryRef = useRef(null);

  return (
    <WindowScroller>
      {({ height, scrollTop, isScrolling, onChildScroll }) => (
        <AutoSizer disableHeight onResize={onResize}>
          {({ width }) => (
            <Masonry
              ref={masonryRef}
              autoHeight
              isScrolling={isScrolling}
              overscanRowCount={5}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              deferredMeasurementCache={cache}
              cellCount={data.length}
              cellMeasurerCache={cache}
              cellPositioner={cellPositioner}
              cellRenderer={cellRenderer}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export { cache, MasonryComponent };
