module.exports = io => {
  //const rooms = {}
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // const roomName = getRoomName(socket)
    // console.log(roomName, 'what is roomName')
    // socket.join(roomName)
    // rooms[roomName] = rooms[roomName] || []
    // socket.emit('load', rooms[roomName])
    socket.on('new-line-from-client', points => {
      socket.broadcast.emit('new-line-from-server', points)
      console.log('new_line')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    //   socket.on('drawing', (...payload) => {
    //     const roomName = getRoomName(socket)
    //     rooms[roomName].push(payload)
    //     socket.to(roomName).emit('someOneDrew', payload)
    //   })
  })
}

// function getRoomName(socket) {
//   const urlArr = socket.request.headers.referer.split('/')
//   const roomName = urlArr.pop()
//   return roomName
// }
