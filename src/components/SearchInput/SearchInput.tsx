import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useTranslation } from 'contexts/Localization'
import { Input } from '../../uikit'

export const StyledInput = styled(Input)`
  width: 190px;
  height: 45px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #FFF;

  &::placeholder {
    font-weight: 600;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 968px) {
    width: 100%;
    margin-top: 15px;
  }
`

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({ onChange: onChangeCallback, placeholder = 'Search' }) => {
  const [searchText, setSearchText] = useState('')

  const { t } = useTranslation()

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    debouncedOnChange(e)
  }

  return <StyledInput value={searchText} onChange={onChange} placeholder={t(placeholder)} />
}

export default SearchInput
