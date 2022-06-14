package api

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"testing"
)

func Test(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "testing_suite_User")
}

var _ = Describe("Api", func() {

	BeforeEach(func() {

	})

	AfterEach(func() {

	})
	Describe("/login", func() {
		When("the username and password are correct", func() {
			It("should return a successful login response", func() {
			})
		})
		When("the username and password are incorrect", func() {
			It("should return a failed login response", func() {

			})
		})
	})
})
