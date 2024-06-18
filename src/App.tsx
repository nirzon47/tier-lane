import { DndContext } from '@dnd-kit/core'
import Content from './components/Content'
import Header from './components/Header'

const App = () => {
	return (
		<>
			<DndContext>
				<Header />
				<Content />
			</DndContext>
		</>
	)
}

export default App
