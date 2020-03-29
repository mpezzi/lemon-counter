import React, { FC, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import store from 'store2';
import './Counter.scss';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const Counter: FC<unknown> = () => {

  const [timestamp, setTimestamp] = useState(
    store.get('Counter.Timestamp', dayjs().format())
  );
  const [diff, setDiff] = useState(0);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    store('Counter.Timestamp', timestamp);
  }, [timestamp]);

  useEffect(() => {
    setTimeout(() => {
      setDiff(dayjs().diff(timestamp, 'day'));
    }, 1000);
  }, [timestamp]);

  useEffect(() => {
    setScale(((diff < 50 ? diff : 50) + 1) * 0.25);
  }, [diff]);

  return (
    <div className="Counter">
      <div className="header">
        <h1 style={{ transform: `scale(${scale}`}}>
          <span role="img" aria-label="lemon counter">
            🍋
          </span>
        </h1>
      </div>
      <div className="body">
        <h2>
          {dayjs(timestamp).fromNow(true)}
        </h2>
        <p>
          {dayjs(timestamp).format('LLLL')}
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setTimestamp(dayjs().format())}
        >
          Reset
        </Button>
      </div>
    </div>
  )

}
