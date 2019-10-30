import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import Colors from './Colors'
const style = {
    border: '1px solid gray',
    minHeight: '2rem',
    width: '100%',
    padding: '2rem',
    boxSizing: 'border-box',
    textAlign: 'center',
}

const TargetBox = ({ onDrop, lastDroppedColor, children }) => {
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
    const [{ isOver, draggingColor, canDrop }, drop] = useDrop({
        accept: [Colors.YELLOW, Colors.BLUE],
        drop(item, monitor) {
            const didDrop = monitor.didDrop(item.type)
            if (didDrop) {
                return
            }
            onDrop(item.type)
            setHasDroppedOnChild(true)
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
            draggingColor: monitor.getItemType(),
        }),
    })
    const opacity = isOver ? 1 : 0.7
    let backgroundColor = '#fff'
    switch (draggingColor) {
        case Colors.BLUE:
            backgroundColor = 'lightblue'
            break
        case Colors.YELLOW:
            backgroundColor = 'lightgoldenrodyellow'
            break
        default:
            break
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor, opacity }}>
            <div>{lastDroppedColor.type}</div>
        </div>
    )
}
const StatefulTargetBox = props => {
    const [lastDroppedColor, setLastDroppedColor] = useState()
    const handleDrop = useCallback(
        color => {
            props.item.type = color
            setLastDroppedColor(color)
        },
        [props.item.type],
    )

    return (
        <div style={{ display: 'flex' }}>
            <input onChange={e => (props.item.label = e.target.value)}></input>
            <TargetBox {...props} lastDroppedColor={props.item} onDrop={handleDrop}></TargetBox>
        </div>
    )
}
export default StatefulTargetBox
