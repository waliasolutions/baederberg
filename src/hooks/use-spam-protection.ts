import { useState, useRef, useCallback } from 'react';

const HONEYPOT_FIELD = '_office_phone';
const MIN_SUBMIT_TIME_MS = 3000;

export function useSpamProtection() {
  const mountedAt = useRef(Date.now());
  const [honeypotValue, setHoneypotValue] = useState('');

  const honeypotProps = {
    name: HONEYPOT_FIELD,
    value: honeypotValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHoneypotValue(e.target.value),
    tabIndex: -1,
    autoComplete: 'off',
  };

  const getSpamFields = useCallback(() => ({
    _hp: honeypotValue,
    _t: Date.now() - mountedAt.current,
  }), [honeypotValue]);

  const isSpamLikely = useCallback(() => {
    return honeypotValue !== '' || Date.now() - mountedAt.current < MIN_SUBMIT_TIME_MS;
  }, [honeypotValue]);

  return { honeypotProps, getSpamFields, isSpamLikely };
}
