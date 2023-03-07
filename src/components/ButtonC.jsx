import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import useColorLevel from '@/components/hooks/useColorLevel'
import { CONTROL_SIZES, SIZES } from '@/components/utils/constant'
import Spinner from '@/components/Spinner'
import { Button } from "@material-tailwind/react";

const ButtonC =  React.forwardRef((props, ref) => {
	const { children, size, color, shape, variant, block, icon, className, disabled, loading, active, danger, ...rest } = props
	const defaultClass = 'button'
	const sizeIconClass = 'inline-flex items-center justify-center'
	
	const splitedColor = color.split('-')

	const buttonSize = size
	const buttonColorLevel = splitedColor[1]

	const [increaseLevel, decreaseLevel] = useColorLevel(buttonColorLevel)

	const getButtonSize = () => {
		let sizeClass = ''
		switch (buttonSize) {
			case SIZES.LG:
				sizeClass = classNames(
					`h-${CONTROL_SIZES.lg}`,
					(icon && !children) ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl` : 'px-8 py-2 text-base'
				)
				break
			case SIZES.SM:
				sizeClass = classNames(
					`h-${CONTROL_SIZES.sm}`,
					(icon && !children) ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg` : 'px-3 py-2 text-sm'
				)
				break
			case SIZES.XS:
				sizeClass = classNames(
					`h-${CONTROL_SIZES.xs}`,
					(icon && !children) ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base` : 'px-3 py-1 text-xs'
				)
				break
			default:
				sizeClass = classNames(
					`h-${CONTROL_SIZES.md}`,
					(icon && !children) ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl` : 'px-8 py-2'
				)
				break
		}
		return sizeClass
	}

	const disabledClass= 'opacity-50 cursor-not-allowed'
	
	const classes = classNames(
		defaultClass,
		`radius-${shape}`,
		getButtonSize(),
		className,
		block ? 'w-full' : ''
	)

	const handleClick = (e) => {
		const { onClick } = props
		if (disabled || loading) {
			e.preventDefault()
			return
		}
		(onClick)?.(e)
	}

	const renderChildren = () => {

		if(loading && children) {
			return (
				<span className="flex items-center justify-center">
					<Spinner enableTheme={false} className="mr-1" />
					{children}
				</span>
			)
		}

		if((icon && !children) && loading) {
			return <Spinner enableTheme={false} />
		}

		if((icon && !children) && !loading) {
			return <>{icon}</>
		}

		if((icon && children) && !loading) {
			return (
			<span className="flex items-center justify-center">
				<span className="text-lg">{icon}</span>
				<span className="ltr:ml-1 rtl:mr-1">{children}</span>
			</span>
			)
		}

		return <>{children}</>

	}

	return (
		<Button 
			ref={ref} 
			className={classes} 
			{...rest} 
			onClick={handleClick}
		>
			{ renderChildren()  }
		</Button>
	)
})

ButtonC.propTypes = {
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	block: PropTypes.bool,
	shape: PropTypes.oneOf(['round', 'circle', 'none']),
	className: PropTypes.string,
	size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.XS, SIZES.MD]),
	color: PropTypes.string,
	variant: PropTypes.oneOf(['filled', 'outlined', 'gradient', 'text']),
	icon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	active: PropTypes.bool,
}

ButtonC.defaultProps = {
	variant: 'default',
	shape: 'round',
	active: false,
	loading: false,
	disabled: false,
	color: ''
}

export default ButtonC
