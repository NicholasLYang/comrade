'use client'

import { useMap } from '@y-sweet/react'

const GRID_SIZE = 10
const DEFAULT_COLOR = 'white'
// For simplicty, we'll just add one color option
// We'll add the color picker in the next step
const COLOR_SELECTIONS = ['black']

export function Grid() {
    // Initialize our Color Grid as an object of cell positions that map to
    // color values. `useMap` returns a Y.Map, and subscribes the component
    // to changes in that map.
    const items = useMap<string>('colorgrid')

    return (
        <div className="space-y-3 p-4 lg:p-8">
            <div>Color Grid</div>
            <table>
                <tbody>
                {Array.from({ length: GRID_SIZE }, (x, i) => (
                    <tr key={i}>
                        {Array.from({ length: GRID_SIZE }, (x, j) => {
                            // Turn the cell position as a string.
                            const key = `${i},${j}`
                            const itemColor = items!.get(key)
                            return (
                                <td key={key}>
                                    <div
                                        className="w-8 h-8 cursor-pointer"
                                        style={{ backgroundColor: itemColor || DEFAULT_COLOR }}
                                        onClick={() => items!.set(key, COLOR_SELECTIONS[0])}
                                    />
                                </td>
                            )
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
