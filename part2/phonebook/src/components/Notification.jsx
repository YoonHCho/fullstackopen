const Notification = ({ notificationMessage }) => {
  if (notificationMessage === null) return;
  const add = notificationMessage.startsWith('Added') ? 'green-color' : 'red-color';
  return (
    <div className={`${add} notification`}>{notificationMessage}</div>
  )
}

export default Notification;