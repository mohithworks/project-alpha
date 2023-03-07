import React from 'react'
import PropTypes from 'prop-types'
import { FormContextProvider, FormContextConsumer } from '@/components/Form/context'
import { SIZES, LAYOUT } from '@/components/utils/constant'
import classNames from 'classnames'

const FormContainer = props => {


    const {
        children,
        labelWidth,
        layout,
        size,
        className
    } = props

    const contextValue = {
        labelWidth,
        layout,
        size : size
    }

    return (
        <FormContextProvider value={contextValue}>
            <FormContextConsumer>
            {
				context => {
                    return (
                        <div className={classNames('form-container', context.layout, className)}>
                            {children}
                        </div>
                    )
                }
            }
           
           </FormContextConsumer>
        </FormContextProvider>
    )
}


FormContainer.propTypes = {
	layout: PropTypes.oneOf([LAYOUT.HORIZONTAL, LAYOUT.VERTICAL, LAYOUT.INLINE]),
    size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
    labelWidth: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
}

FormContainer.defaultProps = {
	layout: LAYOUT.VERTICAL,
    size: SIZES.MD,
    labelWidth: 100
}

export default FormContainer