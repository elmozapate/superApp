import IComponent from "../components/iComponents/icomponent";

const objContent = [{
    type: 'contenedor',
    column: false,
    bgColor: 'white',
    especificWidth: true,
    width: '100',
    color: 'white',
    text: '',
    children: {
        contain: false,
        array: [{
            type: 'contenedor',
            column: false,
            bgColor: 'blue',
            especificWidth: false,
            width: '25',
            color: 'white',
            text: '',
            children: {
                contain: true,
                array: [{
                    type: 'title',
                    column: false,
                    bgColor: 'blue',
                    especificWidth: false,
                    width: '25',
                    color: 'yellow',
                    text: 'foto1',
                    children: {
                        contain: false,
                        array: []
                    }
                }]
            }
        },{
            type: 'contenedor',
            column: false,
            bgColor: 'red',
            especificWidth: true,
            width: '25',
            color: 'white',
            text: '',
            children: {
                contain: true,
                array: [{
                    type: 'title',
                    column: false,
                    bgColor: 'red',
                    especificWidth: false,
                    width: '25',
                    color: 'black',
                    text: 'foto 2',
                    children: {
                        contain: false,
                        array: []
                    }
                }]
            }
        },{
            type: 'contenedor',
            column: false,
            bgColor: 'black',
            especificWidth: true,
            width: '40',
            color: 'white',
            text: '',
            children: {
                contain: true,
                array: [{
                    type: 'title',
                    column: false,
                    bgColor: 'red',
                    especificWidth: false,
                    width: '25',
                    color: 'white',
                    text: 'foto 3',
                    children: {
                        contain: false,
                        array: []
                    }
                }]
            }
        }]
    }
}]

const Test = () => {

    return (
        <>
            <div className="IDiv-main bgcolor-purple">
                <IComponent contains={objContent} />
            </div>
        </>
    )
}
export default Test