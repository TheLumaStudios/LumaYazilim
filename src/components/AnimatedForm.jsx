import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FormGroup = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1rem 1rem 1rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.normal};

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    transform: translateY(-1.5rem) scale(0.85);
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const TextArea = styled(motion.textarea)`
  width: 100%;
  padding: 1rem 1rem 1rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  outline: none;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.transitions.normal};

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    transform: translateY(-1.5rem) scale(0.85);
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Label = styled(motion.label)`
  position: absolute;
  top: 1rem;
  left: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  pointer-events: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  transform-origin: left top;
`;

const ErrorMessage = styled(motion.span)`
  display: block;
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const CharCount = styled(motion.span)`
  position: absolute;
  right: 0;
  bottom: -1.5rem;
  font-size: 0.8rem;
  color: ${({ theme, $isNearLimit }) =>
    $isNearLimit ? '#ff4444' : theme.colors.textLight};
`;

const SuccessIcon = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 1rem;
  color: #00ff88;
  font-size: 1.2rem;
`;

export const AnimatedInput = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  maxLength,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    onChange(e);
    if (required && e.target.value.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <FormGroup>
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        maxLength={maxLength}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
      <Label
        animate={{
          color: isFocused ? 'var(--accent)' : 'var(--text-light)',
        }}
      >
        {label}
        {required && <span style={{ color: '#ff4444' }}> *</span>}
      </Label>
      <AnimatePresence>
        {isValid && !error && (
          <SuccessIcon
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            ✓
          </SuccessIcon>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </ErrorMessage>
        )}
      </AnimatePresence>
      {maxLength && (
        <CharCount $isNearLimit={value.length > maxLength * 0.9}>
          {value.length} / {maxLength}
        </CharCount>
      )}
    </FormGroup>
  );
};

export const AnimatedTextArea = ({
  label,
  value,
  onChange,
  error,
  required,
  maxLength,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormGroup>
      <TextArea
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        maxLength={maxLength}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
      <Label
        animate={{
          color: isFocused ? 'var(--accent)' : 'var(--text-light)',
        }}
      >
        {label}
        {required && <span style={{ color: '#ff4444' }}> *</span>}
      </Label>
      <AnimatePresence>
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </ErrorMessage>
        )}
      </AnimatePresence>
      {maxLength && (
        <CharCount $isNearLimit={value.length > maxLength * 0.9}>
          {value.length} / {maxLength}
        </CharCount>
      )}
    </FormGroup>
  );
};
