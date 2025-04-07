package main

import (
	"bufio"
	"context"
	"fmt"

	libp2p "github.com/libp2p/go-libp2p"
	"github.com/libp2p/go-libp2p/core/peer"
	ma "github.com/multiformats/go-multiaddr"
)

func main() {
	ctx := context.Background()
	node, err := libp2p.New()
	if err != nil {
		panic(err)
	}
	defer node.Close()
	in := "/ip4/127.0.0.1/tcp/10000/p2p/12D3KooWP7NEEzc8N39YMQdRfD9Hor4FHmPCAdChSwveryEeQrxU"
	maddr, err := ma.NewMultiaddr(in)
	if err != nil {
		panic(err)
	}
	info, err := peer.AddrInfoFromP2pAddr(maddr)
	if err != nil {
		panic(err)
	}

	if err := node.Connect(ctx, *info); err != nil {
		panic(err)
	}
	fmt.Println("Connected to: ", info.ID)

	stream, err := node.NewStream(ctx, info.ID, "/chat/1.0.0")
	if err != nil {
		panic(err)
	}

	// Send a message
	rw := bufio.NewReadWriter(bufio.NewReader(stream), bufio.NewWriter(stream))
	title := "Post From Service B"
	content := "This Post comes from Service B Message Queue"

	_, err = rw.WriteString(title + "\n")
	if err != nil {
		panic(err)
	}

	_, err = rw.WriteString(content + "\n")
	if err != nil {
		panic(err)
	}
	rw.Flush()
	fmt.Println("Message sent")

}
