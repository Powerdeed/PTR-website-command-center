"use client";

import Loader from "@global components/ui/Loader";

import useService from "../hooks/useService";

export default function ServicesDisplay() {
  const { state } = useService();

  return (
    <div className="flex-1 feature-container-vertical text-style__body">
      <div className="text-style__subheading">All Services</div>

      <table>
        <thead className="font-semibold text-left">
          <tr>
            <th>Service Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {state.servicesArr &&
            state.servicesArr.map((service) => (
              <tr
                key={service._id}
                className="border-t border-(--terciary-grey) hover:bg-(--terciary-grey)/30"
                onClick={() => {
                  const { _id, ...s } = service;
                  state.setSelectedService(s);
                  state.setSelectedServiceId(_id);
                  state.setIsNewService(false);
                  state.setSelectedServiceStatus(service.status);
                }}
              >
                <td className="py-2.5">{service.name}</td>

                <td className="py-2.5">
                  <div
                    className={`w-fit h-fit py-1 px-2 text-center ${service.status ? "text-(--primary-green) bg-(--secondary-green)/30" : "text-(--primary-red) bg-(--secondary-red)/30"}  text-style__small-text rounded-[10px]`}
                  >
                    {service.status ? "Active" : "Inactive"}
                  </div>
                </td>
              </tr>
            ))}

          {!state.servicesArr &&
            (state.fetchServicesError ? (
              <tr className="text-(--primary-red)">
                *{state.fetchServicesError}*
              </tr>
            ) : (
              <tr>
                <Loader />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
