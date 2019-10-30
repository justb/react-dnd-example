import React from 'react'
import SourceBox from './SourceBox'
import TargetBox from './TargetBox'
import Colors from './Colors'
export default function Container() {
    return (
        <>
            <div style={{ clear: 'both', margin: '-.5rem' }}>
                <div style={{ float: 'left' }}>
                    <button>导出</button>
                    <SourceBox color={Colors.BLUE}>
                        <SourceBox color={Colors.YELLOW}>
                            <SourceBox color={Colors.YELLOW} />
                            <SourceBox color={Colors.BLUE} />
                        </SourceBox>
                        <SourceBox color={Colors.BLUE}>
                            <SourceBox color={Colors.YELLOW} />
                        </SourceBox>
                    </SourceBox>
                </div>

                <div style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
                    <TargetBox></TargetBox>
                </div>
            </div>
        </>
    )
}
