import { describe, expect, test} from 'vitest'
import { useDateToLocalString } from '../../composables/useHalpers'

describe('Testing  useDateToLocalString', () => {

    test('should return date as string', () => {
        const testDate = '11.01.2023'
        const result = useDateToLocalString(new Date(2023, 0, 11))
        expect(result).toBe(testDate)
    })
    // test('should return empty string', () => {
    //     const result = useDateToLocalString('sdf')
    //     console.log('result', result)
    // })

})