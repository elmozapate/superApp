
const HeadTitle = ({ props }) => {
    const { pageName = '', imgSrc = { logo: '' }, classN = '' } = props
    return (
        <>
            <div className={classN}>
                {imgSrc !==  { logo: '' } ? <img src={imgSrc.logo} className='mgr-50 hgt-min' height='50px' alt="" /> : null}
                {pageName}
            </div>
        </>

    )
}
export default HeadTitle