import React, { useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import Colors from './Colors'
const style = {
    border: '1px solid gray',
    minHeight: '15rem',
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
            console.log('TCL: drop -> monitor', monitor)
            const didDrop = monitor.didDrop(item.type)
            if (didDrop) {
                return
            }
            onDrop(item.type)
            setHasDroppedOnChild(true)
            setTimeout(() => {
                setHasDroppedOnChild(123)
            }, 1000)
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
    console.log(children)
    return (
        <div ref={drop} style={{ ...style, backgroundColor, opacity }}>
            {children}
            <p>Drop here.</p>
            {!canDrop && (
                <div>
                    Last dropped:
                    {lastDroppedColor.map(item => {
                        if (item === 'yellow') {
                            return <StatefulTargetBox></StatefulTargetBox>
                        } else {
                            return item
                        }
                    })}
                </div>
            )}
        </div>
    )
}
const StatefulTargetBox = props => {
    const [lastDroppedColor, setLastDroppedColor] = useState([])
    const handleDrop = useCallback(color => setLastDroppedColor(lastDroppedColor.concat(color)), [lastDroppedColor])
    return <TargetBox {...props} lastDroppedColor={lastDroppedColor} onDrop={handleDrop}></TargetBox>
}
export default StatefulTargetBox
