// CONSTANTS AND HELPER FUNCTIONS
const data = {
	dashboard: [
		{
			text: 'Followers',
			stats: { number: 1987, change: 12, increase: true },
			social: { network: 'facebook', handle: '@nathanf' },
		},
		{
			text: 'Followers',
			stats: { number: 1044, change: 96, increase: true },
			social: { network: 'twitter', handle: '@nathanf' },
		},
		{
			text: 'Followers',
			stats: { number: 11000, change: 1099, increase: true },
			social: { network: 'instagram', handle: '@realnathanf' },
		},
		{
			text: 'Subscribers',
			stats: { number: 8239, change: 144, decrease: true },
			social: { network: 'youtube', handle: '@Nathan F' },
		},
	],

	overview: [
		{
			text: 'Page views',
			stats: { number: 87, change: 3, increase: true },
			social: { network: 'facebook' },
		},
		{
			text: 'Likes',
			stats: { number: 52, change: 2, decrease: true },
			social: { network: 'facebook' },
		},
		{
			text: 'Likes',
			stats: { number: 5462, change: 2257, increase: true },
			social: { network: 'instagram' },
		},
		{
			text: 'Profile views',
			stats: { number: 52000, change: 1375, increase: true },
			social: { network: 'instagram' },
		},
		{
			text: 'Retweets',
			stats: { number: 117, change: 303, increase: true },
			social: { network: 'twitter' },
		},
		{
			text: 'Likes',
			stats: { number: 507, change: 553, increase: true },
			social: { network: 'twitter' },
		},
		{
			text: 'Likes',
			stats: { number: 107, change: 19, decrease: true },
			social: { network: 'youtube' },
		},
		{
			text: 'Total views',
			stats: { number: 1407, change: 12, decrease: true },
			social: { network: 'youtube' },
		},
	],
}

const formatToK = (value) => {
	let stringValue = value.toString()
	if (stringValue.length > 4 && stringValue.length <= 6) {
		return value.toString().slice(0, -3) + 'K'
	}
	return value
}

// TODO: Find a way to set the current theme based on CSS's prefer-color-scheme feature
let currentTheme = window.localStorage.getItem('theme') || 'theme--light'

// ATOMS
const Text = ({ size = 'md', color = 'dark-gray', padding = 'sm', margin = 'xs', hasLetterSpacing = false, children }) => (
	<p className={`text text--${size} text--${color} p--${padding} m--${margin} ${hasLetterSpacing ? 'letter-space' : ''}`}>{children}</p>
)

const Card = ({ size = 'md', borderColor, children }) => <article className={`card card__${borderColor} card--${size} `}>{children}</article>

const GridContainer = ({ children, padding = 'md', margin = 'md' }) => <section className={`grid p--${padding} m--${margin}`}>{children}</section>

const FlexContainer = ({ alignment = 'row', padding = 'md', margin = 'xs', className = '', children }) => (
	<section className={`flex flex--${alignment} p--${padding} m--${margin} ${className}`}>{children}</section>
)

// MOLECULES
const Icon = ({ iconName = '', padding = 'xs', margin = 'xs', text = '', textColor = '' }) => {
	if (text) {
		return (
			<FlexContainer>
				{renderIcon()}
				&nbsp;
				<Text size='sm' color={textColor} margin={margin} padding={padding}>
					{text}
				</Text>
			</FlexContainer>
		)
	}
	return renderIcon()

	function renderIcon() {
		return <img src={`./images/icon-${iconName}.svg`}></img>
	}
}

const ThemeToggle = ({ setThemeName, currentTheme }) => {
	const saveThemeName = (themeName) => {
		window.localStorage.setItem('theme', themeName)
	}

	const setTheme = (event) => {
		event.preventDefault()
		if (currentTheme === 'theme--light') {
			setThemeName('theme--dark')
			saveThemeName('theme--dark')
		} else {
			setThemeName('theme--light')
			saveThemeName('theme--light')
		}
	}

	return (
		<FlexContainer alignment='row' margin='md' className='toggle__container'>
			<Text size='sm'>Dark Mode</Text>
			<button className='toggle__button' onClick={setTheme}></button>
		</FlexContainer>
	)
}

// ORGANISMS
const Welcome = ({ setThemeName, currentTheme }) => (
	<FlexContainer alignment='row' padding='md' className='welcome__container'>
		<FlexContainer alignment='column'>
			<Text size='lg' padding='md' color='black'>
				Social Media Dashboard
			</Text>
			<Text size='sm'>Total Followers: 23,004</Text>
		</FlexContainer>
		<ThemeToggle setThemeName={setThemeName} currentTheme={currentTheme} />
	</FlexContainer>
)

const Summary = ({ cardItems }) => (
	<GridContainer margin='lg'>
		{cardItems.map((item, index) => (
			<Card size='lg' key={index} borderColor={item.social.network}>
				<Icon margin='lg' iconName={item.social.network} text={item.social.handle}></Icon>

				<Text color='black' size='xl'>
					{formatToK(item.stats.number)}
				</Text>
				<Text color='dark-gray' size='sm' hasLetterSpacing={true}>
					{item.text}
				</Text>

				<Icon margin='lg' iconName={item.stats.increase ? `up` : `down`} text={`${item.stats.change} today`} textColor={item.stats.increase ? 'success' : 'error'}></Icon>
			</Card>
		))}
	</GridContainer>
)

const Overview = ({ cardItems }) => (
	<div>
		<Text size='md' margin='lg'>
			Overview - Today
		</Text>
		<GridContainer margin='lg'>
			{cardItems.map((item, index) => (
				<Card size='md' key={index} borderColor={item.social.network}>
					<Text color='dark-gray' size='sm'>
						{item.text}
					</Text>
					<Icon margin='lg' iconName={item.social.network} text={item.social.handle}></Icon>

					<Text color='black' size='lg'>
						{formatToK(item.stats.number)}
					</Text>
					<Icon iconName={item.stats.increase ? 'up' : 'down'} text={`${item.stats.change}%`} textColor={item.stats.increase ? 'success' : 'error'}></Icon>
				</Card>
			))}
		</GridContainer>
	</div>
)

// TEMPLATE
const Theme = ({ themeName, children }) => (
	<main className={`${themeName}`}>
		<div className='theme'>{children}</div>
	</main>
)

// PAGE
const App = () => {
	const [themeName, setThemeName] = React.useState(currentTheme)
	return (
		<Theme themeName={themeName}>
			<div className='container'>
				<Welcome setThemeName={setThemeName} currentTheme={themeName} />
				<Summary cardItems={data.dashboard} />
				<Overview cardItems={data.overview} />
			</div>
		</Theme>
	)
}

// HOOKING TO THE REACT VIRTUAL DOM
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
