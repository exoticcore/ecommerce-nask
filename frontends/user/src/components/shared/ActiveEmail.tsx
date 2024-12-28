import { useEffect, useState } from 'react';
import { IActiveEmail } from '../../interface/active.interface';

export default function ActiveEmail({
  activeEmail,
}: {
  activeEmail: IActiveEmail;
}) {
  const countdown_start = activeEmail.countdown * 60;
  const [time, setTime] = useState<number>(countdown_start);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="active-email-main">
      <div className="active-email-main__info">
        <p>กรุณายืนยันการลงทะเบียนในอีเมลของท่าน</p>
        <h5>{activeEmail.email}</h5>
      </div>
      <div className="active-email-main__countdown">
        <p>
          โปรดยืนยันภายใน{' '}
          <b>
            {`${Math.floor(time / 60)}`.padStart(2, '0')}:
            {`${time % 60}`.padStart(2, '0')}
          </b>{' '}
          นาที
        </p>
        <p>
          ลองใส่ได้อีก <b>{activeEmail.count}</b>
        </p>
      </div>
      <div className="active-email-main__re-active">
        <p>หากท่านไม่ได้รับอีเมล</p>
        <div>
          <span>ส่งอีเมลใหม่อีกครั้ง</span>
        </div>
      </div>
    </div>
  );
}
