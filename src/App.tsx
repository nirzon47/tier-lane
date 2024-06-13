import { DragDropContext } from 'react-beautiful-dnd'
import Content from './components/Content'
import Header from './components/Header'
import { FilterProvider } from './lib/context'

const App = () => {
	return (
		<>
			<DragDropContext onDragEnd={() => {}}>
				<FilterProvider>
					<Header />
					<Content />
				</FilterProvider>
			</DragDropContext>
		</>
	)
}

export default App
