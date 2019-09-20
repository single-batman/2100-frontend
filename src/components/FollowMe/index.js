import React, {useState} from 'react'
import {useFollowMeContext} from '../../contexts/FollowMe'
import {useStoreContext} from '../../contexts/Store'
import {sortBy, chunk} from 'lodash'
import MessageCard from './MessageCard'
import {Pagination} from 'react-bootstrap'
import './style.scss'

export default function FollowMeFeed({messages={}, showForm, className, styles, startPage=0}){
  const {query, state} = useStoreContext()
  const perPage = state.config.followMePerPage

  let { isSignedIn, myToken, actions } = useFollowMeContext()

  const [page, setPage] = useState(startPage)

  if (!Array.isArray(messages)) messages = Object.values(messages)

  messages = sortBy(messages, msg => msg.created * -1)

  const chunks = chunk(messages, perPage)
  messages = chunks[page] || []

  const cards = messages.map( message => <MessageCard message={message} myToken={myToken} token={query.getToken(message.tokenid)} isSignedIn={isSignedIn} actions={actions} key={message.id+(message.hidden||'visible')} canComment={false}/>)

  const prevDisabled = page === 0
  const nextDisabled = page === chunks.length - 1

  const prev = e => {
    e.preventDefault()
    if (prevDisabled) return
    setPage(page-1)
  }

  const next = e => {
    e.preventDefault()
    if (nextDisabled) return
    setPage(page+1)
  }

  return (
    <div className={'follow-me-feed '+className} styles={styles}>
        {cards}
        <div className={`pagination small ${chunks.length <= 1 ? 'no-pages' : ''}`}>
          <a href='#' className={`prev ${prevDisabled ? 'disabled': ''}`}  onClick={prev}>‹ prev</a>
          <a href='#' className={`next ${nextDisabled? 'disabled': ''}`}  onClick={next}>next ›</a>
        </div>
    </div>
  )
}