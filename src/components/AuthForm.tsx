import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function AuthForm() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError('');

    if (isSignUp && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(error.message);
        } else if (data.user && data.user.identities?.length === 0) {
          setError('이미 가입된 이메일입니다.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(error.message);
        }
      }
    } catch {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-8">
      <div className="w-full max-w-sm fade-in">
        <button
          onClick={() => navigate('/')}
          className="text-sm tracking-[0.3em] uppercase text-white font-semibold mb-1 hover:text-neutral-300 transition-colors cursor-pointer"
        >
          ← MITDOK
        </button>
        <p className="text-neutral-500 text-sm mb-10">
          {isSignUp ? '회원가입' : '로그인'}하고 구독을 관리하세요
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            autoComplete="email"
            className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (6자 이상)"
            required
            minLength={6}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors text-sm"
          />
          {isSignUp && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors text-sm"
            />
          )}

          {error && (
            <p className="text-sm text-red-500 border border-red-500/20 px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:bg-neutral-800 disabled:text-neutral-600"
          >
            {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); setConfirmPassword(''); }}
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            {isSignUp ? '이미 계정이 있나요? 로그인' : '계정이 없나요? 회원가입'}
          </button>
        </div>
      </div>
    </div>
  );
}
