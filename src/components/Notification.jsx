const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.content}
    </div>
  )
}

export default Notification