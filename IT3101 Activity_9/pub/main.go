package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	libp2p "github.com/libp2p/go-libp2p"
	"github.com/libp2p/go-libp2p/core/network"
)

func main() {
	node, err := libp2p.New(
		libp2p.ListenAddrStrings(
			"/ip4/127.0.0.1/tcp/10000",
		),
	)
	if err != nil {
		panic(err)
	}
	defer node.Close()

	fmt.Println("Node A is ready!")
	fmt.Println("Peer ID: ", node.ID())
	for _, addr := range node.Addrs() {
		fmt.Printf("Listening on: %s/p2p/%s\n", addr, node.ID())
	}

	var persistentStream network.Stream
	node.SetStreamHandler("/chat/1.0.0", func(s network.Stream) {
		if persistentStream != nil {
			persistentStream.Close()
		}
		persistentStream = s
		fmt.Println("New Stream Opened")
		rw := bufio.NewReadWriter(bufio.NewReader(s), bufio.NewWriter(s))
		title, err := rw.ReadString('\n')
		if err != nil {
			fmt.Println("Error reading title:", err)
			return
		}
		content, err := rw.ReadString('\n')
		if err != nil {
			fmt.Println("Error reading content:", err)
			return
		}

		fmt.Println("Received Title:", title)
		fmt.Println("Received Content:", content)
		if err == nil {
			fmt.Println("Received Title:", title)
			fmt.Println("Received Content:", content)
		} else {
			fmt.Println("Error reading message:", err)
		}
		// go readMessage(rw)
		go InsertIntoGQL(title, content)
	})
	select {}
}

type GraphQLRequest struct {
	Query     string                 `json:"query"`
	Variables map[string]interface{} `json:"variables"`
}

func InsertIntoGQL(title, content string) error {
	fmt.Println("Gql Title:", title)
	fmt.Println("Gql Content:", content)
	mutation := `
mutation CreatePost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id
    title
    content
  }
}
`

	variables := map[string]interface{}{
		"title":   title,
		"content": content,
	}

	reqBody := GraphQLRequest{
		Query:     mutation,
		Variables: variables,
	}
	requestJSON, err := json.Marshal(reqBody)
	if err != nil {
		return err
	}
	resp, err := http.Post("http://localhost:4002/graphql", "application/json", bytes.NewBuffer(requestJSON))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	fmt.Println("GraphQL Response Status:", resp.Status)
	return nil
}

// func readMessage(rw *bufio.ReadWriter) {
// 	for {
// 		msg, err := rw.ReadString('\n')
// 		if err != nil {
// 			if err.Error() == "EOF" {
// 				fmt.Println("Stream closed by the other peer. Exiting...")
// 				break
// 			} else {
// 				log.Println("Error reading message:", err)
// 				break
// 			}
// 		}

// 		fmt.Println("Received:", msg)
// 	}
// }
