import { DragDropContext } from 'react-beautiful-dnd'
import Content from './components/Content'
import Header from './components/Header'

const App = () => {
	return (
		<>
			<DragDropContext onDragEnd={() => {}}>
				<Header />
				<Content />
			</DragDropContext>
		</>
	)
}

export default App
